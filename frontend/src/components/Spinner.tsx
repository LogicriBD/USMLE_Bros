import { Spinner } from "react-bootstrap";

const SpinLoading = ({ invert }: { invert?: boolean }) =>
{
    return (
        <div className="w-full flex flex-row justify-center items-center my-4 px-4 py-2">
            <Spinner animation="border" variant={invert ? "light" : "primary"} role="status" />
        </div>
    );
}

export default SpinLoading;