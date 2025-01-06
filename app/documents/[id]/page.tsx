import { Document } from "@/components/organisms/Document/Document";

type DocumentPageProps = {
  params: {
    id: string;
  };
};

export default async function DocumentPage(props: DocumentPageProps) {
  const { params } = props;
  const { id } = await params;

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}
