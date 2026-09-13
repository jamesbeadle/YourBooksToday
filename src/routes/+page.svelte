<script lang="ts">
	import AskYourBooksSection from '$lib/components/home/AskYourBooksSection.svelte';
	import BenefitsSection from '$lib/components/home/BenefitsSection.svelte';
	import FeaturesSection from '$lib/components/home/FeaturesSection.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import { companyDetails } from '$lib/data/companyDetails';

	const pageTitle = 'Your Books Today — books that balance, books you can ask';
	const pageDescription =
		'Double-entry bookkeeping for a small business. Invoices, expenses, journals, profit and loss and a balance sheet, kept in one ledger and readable from end to end.';
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
<FeaturesSection />
<AskYourBooksSection />
<BenefitsSection />
