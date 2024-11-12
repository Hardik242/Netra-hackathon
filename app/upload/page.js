import {generateAndUploadData} from "../_lib/data";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form action={generateAndUploadData}>
                <div className="my-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Upload all data
                    </button>
                </div>
            </form>
        </div>
    );
}
