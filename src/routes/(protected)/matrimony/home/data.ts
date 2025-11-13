export const introCards = {
	create: {
		id: 'create',
		title: 'Create profile',
		desc: [
			'Go ahead! Fill in your details and submit for verification. Once your details are verified, you will be able to access all the features!'
		],
		actions: [
			{
				label: 'Create',
				href: '/matrimony/profile/basic-information'
			}
		]
	},
	complete: {
		id: 'complete',
		title: 'Complete profile',
		desc: [
			'Fill in all your details and submit for verification. Once your details are verified, you will be able to access all the features!'
		],
		actions: [
			{
				label: 'Create',
				href: '/matrimony/profile/basic-information'
			}
		]
	},
	verifying: {
		id: 'verifying',
		title: 'Verification in progress',
		desc: [
			'Congratulations on filling your profile! We are verifying your details and will process it as soon as possible. Please note that we might reach out to you in case any clarification is required.'
		]
	},
	paymentPending: {
		id: 'paymentPending',
		title: 'Payment pending',
		desc: [
			'Payment is due for your subscription. Kindly do the needful to avail our services. If there are any concerns or issues in doing so, feel free to reach out to us!'
		],
		actions: [
			{
				label: 'Contact us',
				href: '/contact-us',
				secondary: true
			},
			{
				label: 'Pay',
				href: '/account/subscriptions'
			}
		]
	},
	expired: {
		id: 'expired',
		title: 'Renewal required',
		desc: [
			'Your subscription is due for renewal. Kindly do the needful to avail our services. If there are any concerns or issues in doing so, feel free to reach out to us!'
		],
		actions: [
			{
				label: 'Contact us',
				href: '/contact-us',
				secondary: true
			},
			{
				label: 'Pay',
				href: '/account/subscriptions'
			}
		]
	}
};
