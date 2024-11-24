export function splitContentByH1Sections(content: any): any[] {
  const sections: string[] = [];
  const regex = /<h1[^>]*>.*?<\/h1>[\s\S]*?(?=<h1[^>]*>|$)/gi;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const trimmedSection = match[0]
      .replace(/&nbsp;/g, ' ')
      .replace(/>\s+/, '>')
      .replace(/\s+</, '<')
      .trim();
    sections.push(trimmedSection);
  }

  return sections;
}
export function extractFirstH1(content: string): string | null {
  const match = content.match(/<h1>(.*?)<\/h1>/);
  if (match) {
    const h1Content = match[1];
    const strippedContent = h1Content.replace(/<[^>]*>/g, "");
    return strippedContent.trim();
  }
  return null;
}
