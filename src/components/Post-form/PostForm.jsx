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
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="w-2/3">
                    <Input
                        label="title"
                        placeholder="enter the title"
                        className="w-full"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="slug"
                        placeholder="slug"
                        className="w-full"
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
                <div className="w-1/3">
                    <Input
                        label="featured image"
                        type="file"
                        accept="image/jpg, image/png, image/jpeg, image/gif"
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

                    <Select
                        options={["active", "inactive"]}
                        label="status"
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