<script lang="ts">
	import AlwaysOnSection from '$lib/components/home/AlwaysOnSection.svelte';
	import AskYourBooksSection from '$lib/components/home/AskYourBooksSection.svelte';
	import BenefitsSection from '$lib/components/home/BenefitsSection.svelte';
	import CapabilitiesSection from '$lib/components/home/CapabilitiesSection.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import HowItWorksSection from '$lib/components/home/HowItWorksSection.svelte';
	import { companyDetails } from '$lib/data/companyDetails';

	const pageTitle = 'Your Books Today — books that keep themselves';
	const pageDescription =
		'An accounting platform for businesses of any size. Bills, receipts and bank lines file themselves on a schedule, the ledger underneath is proper double entry, and you ask it anything in the conversation you are already having.';
	const shareImageUrl = `${companyDetails.websiteUrl}/favicon.svg`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={companyDetails.websiteUrl} />
	<meta property="og:image" content={shareImageUrl} />
</svelte:head>

<HeroSection />
<HowItWorksSection />
<CapabilitiesSection />
<AskYourBooksSection />
<AlwaysOnSection />
<BenefitsSection />
