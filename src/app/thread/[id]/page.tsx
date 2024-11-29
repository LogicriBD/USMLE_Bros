import ThreadDisplay from "@/src/components/Forum/Thread/ThreadDisplay";

const ThreadPage = ({ params }: { params: { id: string } }) => {
    
    const { id } = params;

    return(
        <div className="w-full h-full flex">
            <ThreadDisplay id={id} />
        </div>
    );
}

export default ThreadPage;