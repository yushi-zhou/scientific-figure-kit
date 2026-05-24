export interface ExportOptions {
  filename: string;
}

export function exportSvg(svgElement: SVGSVGElement, options: ExportOptions): string {
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElement);
  
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = options.filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  return source;
}
