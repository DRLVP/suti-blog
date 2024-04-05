import React, { useCallback, useEffect } from "react";
import { Input, Button, Select, RTE } from "../index";
import { useForm } from "react-hook-form";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData.userData);


    // console.log("this is post in PostForm:::", post);

    const submit = async (data) => {
        if (post) {
            const file =
                data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;

                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="w-full py-8">
            <form onSubmit={handleSubmit(submit)} className="flex justify-start flex-wrap md:gap-0 gap-8">
                <div className="w-2/3  p-2 flex flex-col gap-4 max-[768px]:w-full ">
                    <label htmlFor="title" className="text-[#dadada] font-semibold">Title :</label>
                    <input
                        id="title"
                        placeholder="enter the title"
                        className="w-full input input-bordered"
                        {...register("title", { required: true })}
                    />

                    <label htmlFor="title" className="text-[#dadada] font-semibold">Slug :</label>
                    <input
                        placeholder="slug"
                        className="w-full input input-bordered"
                        readOnly
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue(
                                "slug",
                                slugTransform(e.currentTarget.value),
                                { shouldValidate: true }
                            );
                        }}
                    />

                    <RTE
                        label="content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>

                <div className="w-1/3 flex flex-col gap-4 max-[768px]:w-full">
                    <label htmlFor="file">Featured image:</label>
                    <input
                        type="file"
                        accept="image/jpg, image/png, image/jpeg, image/gif"
                        id="file"
                        className="input input-bordered w-full"
                        {...register("image", { required: !post })}
                    />

                    {post && (
                        <div className="w-full">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                            />
                        </div>
                    )}
                    <label>Status:</label>
                    <Select
                        options={["active", "inactive"]}
                        {...register("status", { required: true })}
                    />

                    <Button type="submit">
                        {post ? "update" : "submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PostForm;