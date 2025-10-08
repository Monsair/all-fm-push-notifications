export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic os_v2_app_zkojhyzuhzccdjygrwlfng2fvo2xaury6yjee2vy5tme6xq3znkyofsb6jtbtwbpbukjuar3zuzoggb6omrzrnsawrcgxtmgzz7jq6y'
            },
            body: JSON.stringify({
                app_id: 'ca9c93e3-343e-4421-a706-8d96569b45ab',
                data: { 
                    action: 'refresh_history',
                    timestamp: new Date().toISOString()
                },
                content_available: true,
                included_segments: ['All']
            })
        });

        const result = await response.json();
        
        console.log('Silent push sent successfully:', result);
        res.status(200).json({ 
            success: true, 
            message: 'Silent push notification sent',
            result: result
        });
        
    } catch (error) {
        console.error('Error sending silent push:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}
