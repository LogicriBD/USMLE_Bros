export function splitContentByH1Sections(content: any): any[] {
    const sections: string[] = [];
    const regex = /<h1[^>]*>.*?<\/h1>[\s\S]*?(?=<h1[^>]*>|$)/gi;

    let match;
    while ((match = regex.exec(content)) !== null) {
        sections.push(match[0]);
    }

    return sections;
}