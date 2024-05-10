"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import AuthContainer from "../containers/AuthContainer";
import Button from "../general/Button";
import Heading from "../general/Heading";
import Input from "../general/Input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useEffect } from "react";
import { User } from "@prisma/client";

interface LoginClientProps {
  currentUser: User | null | undefined;
}
 
const LoginClient: React.FC<LoginClientProps> = ({currentUser}) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("login işlemi başarılı");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Giriş Yap" center />
        <Input
          placeholder="Email"
          type="text"
          id="email"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Parola"
          type="password"
          id="password"
          register={register}
          errors={errors}
          required
        />
        <Button text="Giriş Yap" onClick={handleSubmit(onSubmit)} />
        <Link
          href={"/register"}
          className="underline mt-3 text-sm text-slate-500"
        >
          Henüz kayıt olmadım.
        </Link>
        <div className="my-3 text-center">Veya</div>
        <Button
          text="Google ile Giriş Yap"
          outline
          onClick={() => signIn('google')}
          icon={FcGoogle}
        />
      </div>
    </AuthContainer>
  );
};

export default LoginClient;
