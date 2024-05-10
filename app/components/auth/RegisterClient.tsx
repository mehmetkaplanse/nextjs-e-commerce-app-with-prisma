"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import AuthContainer from "../containers/AuthContainer";
import Button from "../general/Button";
import Heading from "../general/Heading";
import Input from "../general/Input";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import React, { useEffect } from "react";

interface RegisterClientProps {
  currentUser: User | null | undefined;
}

const RegisterClient:React.FC<RegisterClientProps> = ({currentUser}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    axios.post("/api/register", data).then(() => {
      toast.success("Kullanıcı oluşturuldu.");
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/cart");
          router.refresh()
          toast.success('login işlemi başarılı')
        }

        if(callback?.error) {
          toast.error(callback.error);
        }
      });
    });
  };

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Kayıt Ol" center />
        <Input
          placeholder="Ad"
          type="text"
          id="name"
          register={register}
          errors={errors}
          required
        />
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
        <Button text="Kayıt Ol" onClick={handleSubmit(onSubmit)} />
        <Link href={"/login"} className="underline mt-3 text-sm text-slate-500">
          Zaten bir hesabım var?
        </Link>
        <div className="my-3 text-center">Veya</div>
        <Button
          text="Google ile Üye Ol"
          outline
          onClick={() => signIn('google')}
          icon={FcGoogle}
        />
      </div>
    </AuthContainer>
  );
};

export default RegisterClient;
