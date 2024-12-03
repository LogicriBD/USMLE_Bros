export type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type ForumProps = {
  params: Promise<{ id: string; level: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
