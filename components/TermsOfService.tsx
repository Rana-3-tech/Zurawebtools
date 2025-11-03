import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto prose lg:prose-lg">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Terms of Service for ZuraWebTools</h2>

                    <p><strong>Last Updated:</strong> October 26, 2023</p>

                    <h3>1. Terms</h3>
                    <p>By accessing the website at zurawebtools.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>

                    <h3>2. Use License</h3>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on ZuraWebTools's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    <ul className="list-disc pl-6">
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on ZuraWebTools's website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                    <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by ZuraWebTools at any time.</p>

                    <h3>3. Disclaimer</h3>
                    <p>The materials on ZuraWebTools's website are provided on an 'as is' basis. ZuraWebTools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

                    <h3>4. Limitations</h3>
                    <p>In no event shall ZuraWebTools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ZuraWebTools's website, even if ZuraWebTools or a ZuraWebTools authorized representative has been notified orally or in writing of the possibility of such damage.</p>

                    <h3>5. Governing Law</h3>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the applicable jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>

                    <p><strong>Note:</strong> This is a template Terms of Service. You should consult with a legal professional to ensure it is suitable for your business and jurisdiction.</p>
                </div>
            </div>
        </section>
    );
};

export default TermsOfService;
