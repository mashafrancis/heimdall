import Stripe from 'stripe'

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
  {
    apiVersion: '2023-08-16',
    appInfo: {
      name: 'Loglib.io',
      version: '0.1.0',
    },
  },
)

export async function cancelSubscription(customer?: string) {
  if (!customer) return

  try {
    const subscriptionId = await stripe.subscriptions
      .list({
        customer,
      })
      .then((res) => res.data[0]?.id)
    if (!subscriptionId) {
      throw Error('Empty Subscription Id')
    }
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: 'Customer deleted their Dub project.',
      },
    })
  } catch (error) {
    console.log('Error cancelling Stripe subscription', error)
    return
  }
}
