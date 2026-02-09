const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const sgMail = require('@sendgrid/mail');

const storage = new Storage();
const bucketName = 'your-public-ui-bucket'; // Create this bucket in GCP
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

functions.http('fullstoryHandler', async (req, res) => {
    // 1. Parse Fullstory Webhook
    const data = req.body;
    const sessionId = data.session_id;
    const userEmail = data.user_email || "Anonymous";

    try {
        // 2. The Logic: Prepare the UI message
        const uiMessage = {
            show: true,
            text: "Hey! We noticed your interest in a large donation. Please fill out our priority form!",
            timestamp: Date.now()
        };

        // 3. Save to a JSON file named after the Session ID
        // Your website will check for this specific file
        const file = storage.bucket(bucketName).file(`${sessionId}.json`);
        await file.save(JSON.stringify(uiMessage), {
            contentType: 'application/json',
            metadata: { cacheControl: 'no-cache' }
        });

        // 4. Send Email (to Sales or Customer)
        await sgMail.send({
            to: 'sales@yourcompany.com',
            from: 'system@yourcompany.com',
            subject: `High Value Session: ${userEmail}`,
            text: `View session here: ${data.app_url_session}`
        });

        res.status(200).send('Success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
