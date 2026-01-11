export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { data } = req.body;

    const response = await fetch(
        `https://api.github.com/repos/Nutopia-F-B/brest-report/dispatches`,
        {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${process.env.GH_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_type: "update-data",
                client_payload: { data: JSON.stringify({ branches: data }) }
            })
        }
    );

    if (response.ok) {
        return res.status(200).json({ message: "Success" });
    } else {
        return res.status(500).json({ message: "Failed", error: await response.text() });
    }
}
