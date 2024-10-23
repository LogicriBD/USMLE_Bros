import AuthStateManager from "@/src/context/AuthStateManager";

const DummyPage = () =>
{
    return (
        <AuthStateManager>
            <div>
                <h1>Protected Page</h1>
            </div>
        </AuthStateManager>
    );
}

export default DummyPage;