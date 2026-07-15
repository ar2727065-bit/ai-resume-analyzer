export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLibInstance: any = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLibInstance) return pdfjsLibInstance;

    if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error("PDF conversion can only run in the browser.");
    }

    const [{ default: pdfWorker }, pdfjsModule] = await Promise.all([
        import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
        import("pdfjs-dist/build/pdf.mjs"),
    ]);

    pdfjsModule.GlobalWorkerOptions.workerSrc = pdfWorker;
    pdfjsLibInstance = pdfjsModule;
    return pdfjsLibInstance;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: false });

        if (!context) {
            throw new Error("Canvas 2D context is not available in this browser.");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "medium";

        await page.render({ canvasContext: context, viewport }).promise;

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                0.9
            );
        });
    } catch (err) {
        console.error("PDF conversion failed", err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err instanceof Error ? err.message : String(err)}`,
        };
    }
}