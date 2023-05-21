import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, images, ziggy }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        upload_image: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    function handleUploadImage(event) {
        const file = event.target.files[0];
        setData("upload_image", file);

        if (file && file.type.startsWith("image/")) {
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    setImagePreview(reader.result);
                };
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("images.create"));
        reset();
        setImagePreview();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="border-b pb-3">
                            <input
                                type="file"
                                accept="image/*"
                                id="contained-button-file"
                                className="block"
                                name="upload_image"
                                onChange={handleUploadImage}
                            />
                            {imagePreview ? (
                                <img
                                    className="mt-2"
                                    src={imagePreview}
                                    href="upload image"
                                />
                            ) : null}

                            <PrimaryButton
                                className="mt-4"
                                type="submit"
                                disabled={processing}
                            >
                                Upload
                            </PrimaryButton>
                        </form>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {images.map((img) => (
                                    <tr>
                                        <td>{img.id}</td>
                                        <td>
                                            <img
                                                src={img.image_url}
                                                alt="image"
                                                className="max-w-[500px] p-4"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
