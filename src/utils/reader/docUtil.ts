import { ConfigService } from "../../assets/lib/kookit-extra-browser.min";

export const getIframeDoc = (format: string, bookKey?: string) => {
  let pageArea = document.getElementById("page-area");

  if (!pageArea) return [];
  let iframe = pageArea.getElementsByTagName("iframe")[0];
  if (!iframe) return [];
  let doc = iframe.contentDocument;

  if (!doc) {
    return [];
  }
  // 固定版式 EPUB 也按页拆成多个子 iframe；缓存版 EPUB 没有容器，仍走单文档
  const isFixedLayoutEpub =
    format === "EPUB" && !!doc.querySelector(".pdf-container");
  const isPaginated =
    (format === "PDF" ||
      format?.startsWith("CB") ||
      format === "PPTX" ||
      format === "PPT" ||
      format === "XPS" ||
      format === "OXPS" ||
      format === "DJVU" ||
      format === "DJV" ||
      format === "OFD" ||
      isFixedLayoutEpub) &&
    !(
      bookKey &&
      format === "PDF" &&
      ConfigService.getAllListConfig("convertPDFBooks").includes(bookKey)
    );
  if (isPaginated) {
    let subIframes = doc.querySelectorAll("iframe");
    return [
      doc,
      ...Array.from(subIframes).map((subIframe) => {
        let subDoc = subIframe.contentDocument;
        return subDoc;
      }),
    ];
  } else {
    return [doc];
  }
};
export const getIframeWin = () => {
  let pageArea = document.getElementById("page-area");
  if (!pageArea) return null;
  let iframe = pageArea.getElementsByTagName("iframe")[0];
  if (!iframe) return null;
  return iframe;
};
