import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import {
	CompositePropagator,
	W3CBaggagePropagator,
	W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import {
	Resource,
	browserDetector,
	detectResourcesSync,
} from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import { Config } from './types';

const COLLECTOR_STRING = 'https://otelcol.francismasha.com/v1/traces';

export function trace({ collector, id }: Partial<Config>) {
	let resource = new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: id ?? 'Heimdall',
		[SemanticResourceAttributes.SERVICE_VERSION]: '0.0.1',
	});

	const heimdallExporter = new OTLPTraceExporter({
		url: collector || COLLECTOR_STRING,
		// headers: {
		// 	'content-type': 'application/json',
		// },
	});

	// Setup Propagator
	const propagator = new CompositePropagator({
		propagators: [
			new B3Propagator(),
			new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),
			new W3CBaggagePropagator(),
			new W3CTraceContextPropagator(),
		],
	});

	const detectedResources = detectResourcesSync({
		detectors: [browserDetector],
	});
	resource = resource.merge(detectedResources);
	const provider = new WebTracerProvider({
		resource,
	});

	// Uncomment this to enable debugging using consoleExporter
	// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
	provider.addSpanProcessor(new BatchSpanProcessor(heimdallExporter));

	provider.register({
		propagator,
		// contextManager: new ZoneContextManager(),
	});

	console.log(`Registering Otel ${new Date().getMilliseconds()}`);

	registerInstrumentations({
		tracerProvider: provider,
		instrumentations: [
			// new DocumentLoadInstrumentation(),
			// new UserInteractionInstrumentation(),
			// new XMLHttpRequestInstrumentation(),
			getWebAutoInstrumentations({
				'@opentelemetry/instrumentation-fetch': {
					propagateTraceHeaderCorsUrls: /.*/,
					clearTimingResources: true,
					applyCustomAttributesOnSpan(span) {
						span.setAttribute('app.synthetic_request', 'true');
					},
				},
				'@opentelemetry/instrumentation-xml-http-request': {
					enabled: true,
					ignoreUrls: ['/localhost:8081/sockjs-node'],
					clearTimingResources: true,
					propagateTraceHeaderCorsUrls: [/.+/g],
				},
				'@opentelemetry/instrumentation-document-load': {
					enabled: true,
				},
				'@opentelemetry/instrumentation-user-interaction': {
					enabled: true,
				},
			}),
		],
	});
}
