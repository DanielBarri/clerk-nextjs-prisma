export async function getYouTubeVideos(query: string) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const q = query;
    const apiURL = process.env.YOUTUBE_API_URL;
    const type = "video";
    const part = "snippet";
    const status = "public";
    const maxResults = 10;
    const order = "relevance";
    const videoDuration = "long";
    const videoEmbeddable = true;
    const safeSearch = "strict";
    const publishedAfter = "2023-01-01T00:00:00Z";

    try {
        const data = await fetch(
            `${apiURL}?key=${apiKey}&q=${q}&type=${type}&part=${part}&status=${status}&maxResults=${maxResults}&order=${order}&videoDuration=${videoDuration}&videoEmbeddable=${videoEmbeddable}&safeSearch=${safeSearch}&publishedAfter=${publishedAfter}`
        );
        if (!data.ok) {
            throw new Error(`Failed to fetch videos: ${data.status}`);
        }

        return await data.json();
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        throw error;
    }
}
