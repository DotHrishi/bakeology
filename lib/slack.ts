/**
 * Sends a message to the #bakeology Slack channel via an Incoming Webhook.
 * Silently swallows errors so it never blocks the main API response.
 */
export async function notifySlack(text: string): Promise<void> {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
    } catch (err) {
        console.error("[Slack] Failed to send notification:", err);
    }
}
