const opentelemetry = require('@opentelemetry/sdk-node');
const {
	getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
	OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-grpc');
const {
	OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-grpc');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const {
	awsEc2Detector,
	awsEksDetector,
} = require('@opentelemetry/resource-detector-aws');
const {
	containerDetector,
} = require('@opentelemetry/resource-detector-container');
const { gcpDetector } = require('@opentelemetry/resource-detector-gcp');
const {
	envDetector,
	hostDetector,
	osDetector,
	processDetector,
	Resource,
} = require('@opentelemetry/resources');
const {
	SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions');

const sdk = new opentelemetry.NodeSDK({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: 'Heimdall',
	}),
	traceExporter: new OTLPTraceExporter(),
	instrumentations: [
		getNodeAutoInstrumentations({
			'@opentelemetry/instrumentation-fs': {
				enabled: false,
			},
			// Each of the auto-instrumentations
			// can have config set here, or you can
			// npm install each individually and not use the auto-instruments
			'@opentelemetry/instrumentation-http': {
				ignoreIncomingPaths: [
					// Pattern match to filter endpoints
					// that you really want to stop altogether
					'/ping',

					// You can filter conditionally
					// Next.js gets a little too chatty
					// if you trace all the incoming requests
					...(process.env.NODE_ENV !== 'production'
						? [/^\/_next\/static.*/, /^\/_rsc=*/]
						: []),
				],

				// This gives your request spans a more meaningful name
				// than `HTTP GET`
				requestHook: (span, request) => {
					span.setAttributes({
						name: `${request.method} ${request.url || request.path}`,
					});
				},

				// Re-assign the root span's attributes
				startIncomingSpanHook: (request) => {
					return {
						name: `${request.method} ${request.url || request.path}`,
						'request.path': request.url || request.path,
					};
				},
			},
		}),
	],
	metricReader: new PeriodicExportingMetricReader({
		exporter: new OTLPMetricExporter(),
	}),
	resourceDetectors: [
		containerDetector,
		envDetector,
		hostDetector,
		osDetector,
		processDetector,
		awsEksDetector,
		awsEc2Detector,
		gcpDetector,
	],
});

sdk.start();

// gracefully shut down the SDK on process exit
// process.on('SIGTERM', () => {
// 	sdk
// 		.shutdown()
// 		.then(() => console.log('Tracing terminated'))
// 		.catch((error) => console.log('Error terminating tracing', error))
// 		.finally(() => process.exit(0));
// });
