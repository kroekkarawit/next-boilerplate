import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const TermsAndConditions = () => {
  return (
    <div className="mt-6">
      <Collapsible>
        <CollapsibleTrigger className="text-sm text-blue-500 underline cursor-pointer">
          View Terms &amp; Conditions
        </CollapsibleTrigger>
        <CollapsibleContent className="text-sm text-gray-600 mt-2 border border-stone-400 rounded-lg p-4 bg-stone-300 max-h-80 overflow-y-auto">
          <h2 className="text-lg font-semibold text-black">🌟 Terms & Conditions | Star-Keep.com</h2>
          <p>Last Updated: [Insert Date]</p>

          <p>
            Welcome to <strong>Star-Keep.com</strong>! These Terms & Conditions govern your use of our website and services.
            By purchasing a star or using our platform, you agree to abide by these terms.
          </p>

          <h3 className="font-semibold text-gray-700 mt-4">1. Introduction</h3>
          <p>
            Star-Keep.com is a digital platform that allows users to purchase, name, and personalize stars in the night sky.
            This service is for symbolic and sentimental purposes only and does not grant legal ownership of celestial bodies.
          </p>

          <h3 className="font-semibold text-gray-700 mt-4">2. Purchasing a Star</h3>
          <p>
            You can purchase a unique star from our website, with pricing ranging from $6 to $199, depending on the package.
            Payments are securely processed via Stripe.
          </p>

          <h3 className="font-semibold text-gray-700 mt-4">3. Star Customization & Privacy</h3>
          <p>
            After purchasing a star, you may:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name the star</li>
            <li>Add a custom dedication or message</li>
            <li>Upload images, videos, and text</li>
            <li>Choose privacy settings: Public, Owner Only, or Password-Protected</li>
          </ul>

          <h3 className="font-semibold text-gray-700 mt-4">4. Refund Policy</h3>
          <p><strong>All sales are final.</strong> Due to the digital nature of the service, we do not offer refunds once a star has been registered.</p>

          <h3 className="font-semibold text-gray-700 mt-4">5. Content Guidelines</h3>
          <p>
            Users may upload images and videos to personalize their stars, but prohibited content includes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nudity, violence, or explicit content</li>
            <li>Hate speech or discriminatory material</li>
            <li>Copyrighted content you do not own</li>
          </ul>
          <p>Star-Keep.com reserves the right to remove any content that violates these guidelines.</p>

          <h3 className="font-semibold text-gray-700 mt-4">6. Data Retention & Account Security</h3>
          <p>Your purchased star and associated data will be stored for a minimum of 10 years.</p>

          <h3 className="font-semibold text-gray-700 mt-4">7. Contact Information</h3>
          <p>
            For support, contact us at:  
            📧 <strong>support@star-keep.com</strong>  
            🌐 <strong>https://star-keep.com</strong>
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TermsAndConditions;
