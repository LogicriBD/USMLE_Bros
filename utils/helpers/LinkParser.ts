import linkifyHtml from 'linkify-html';

export default function LinkMessage(message:string):string {
    const options = {
        defaultProtocol: 'https',
    };
    return linkifyHtml(message, options);
}