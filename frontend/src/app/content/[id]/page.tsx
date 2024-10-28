import Sidebar from "@/src/components/Content/Sidebar";


const ContentPage = () =>
{
    return (
        <div className="w-full flex flex-row h-screen">
            <Sidebar />
            <div className="w-full overflow-scroll px-4 py-2 mx-4 my-2">
                <h1>Introduction</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h2>Getting Started</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h2>Authentication</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h3>Database</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h3>Storage</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h3>Hosting</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h4>Functions</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h3>Functions</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h2>Database</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h1>Getting Started</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h1>Authentication</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h1>Database</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h1>Storage</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h1>Hosting</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <h1>Functions</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    );
}

export default ContentPage;