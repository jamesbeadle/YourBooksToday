export type HowItWorksStep = {
	id: string;
	number: string;
	name: string;
	description: string;
};

export const howItWorksSteps: HowItWorksStep[] = [
	{
		id: 'connect',
		number: '01',
		name: 'Connect what you already have',
		description:
			'Your mailbox, your bank, the address suppliers invoice. Nothing about how the paperwork reaches you has to change — the platform goes to where it already lands.'
	},
	{
		id: 'file',
		number: '02',
		name: 'It files itself, on a schedule',
		description:
			'Work runs whether or not anyone is looking: reading what arrived, taking the figures off it, posting the journal, matching it to the bank. What it cannot settle on its own, it asks about.'
	},
	{
		id: 'ask',
		number: '03',
		name: 'Ask, where you already talk',
		description:
			'Your books answer inside the assistant you use, as a set of named actions it can read and run. No new interface to learn, and no waiting for someone to prepare the answer.'
	}
];
