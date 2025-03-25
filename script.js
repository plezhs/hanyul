document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const content = document.getElementById("content");
    const ui = document.getElementById("ui");
    const toggleSettings = document.getElementById("toggleSettings");
    const settings = document.getElementById("settings");

    const bgColor = document.getElementById("bgColor");
    const textColor = document.getElementById("textColor");
    const fontSize = document.getElementById("fontSize");
    const lineHeight = document.getElementById("lineHeight");

    let uiVisible = true;

    // PDF 파일 로드
    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = async function () {
                const typedarray = new Uint8Array(this.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                
                let text = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    text += content.items.map(item => item.str).join(" ") + "\n\n";
                }

                content.textContent = text;
                content.classList.remove("hidden");
            };
            reader.readAsArrayBuffer(file);
        }
    });

    // 터치할 때마다 UI 숨기기/보이기
    content.addEventListener("click", () => {
        uiVisible = !uiVisible;
        ui.style.display = uiVisible ? "block" : "none";
    });

    // 설정 버튼 토글
    toggleSettings.addEventListener("click", () => {
        settings.classList.toggle("hidden");
    });

    // 설정 변경 반영
    bgColor.addEventListener("input", () => {
        document.body.style.backgroundColor = bgColor.value;
    });

    textColor.addEventListener("input", () => {
        content.style.color = textColor.value;
    });

    fontSize.addEventListener("input", () => {
        content.style.fontSize = `${fontSize.value}px`;
    });

    lineHeight.addEventListener("input", () => {
        content.style.lineHeight = lineHeight.value;
    });
});
