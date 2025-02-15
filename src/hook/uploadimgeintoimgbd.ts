export async function uploadImageToImgBB(imageFile: File): Promise<string | null> {
    const apiKey = "b17123664daf87224150e3130c133a67";
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            return data.data.url; // ✅ Return the image URL
        } else {
            console.error("Upload failed:", data.error);
            throw new Error("Image upload failed");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}

