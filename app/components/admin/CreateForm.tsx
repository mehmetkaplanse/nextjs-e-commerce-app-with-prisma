"use client";
import toast from "react-hot-toast";
import Heading from "../general/Heading";
import Input from "../general/Input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Checkbox from "../general/Checkbox";
import { FaComputer } from "react-icons/fa6";
import { FaTabletAlt } from "react-icons/fa";
import { GiBallerinaShoes } from "react-icons/gi";
import { CiMicrophoneOn } from "react-icons/ci";
import ChoiceInput from "../general/ChoiceInput";
import Button from "../general/Button";
import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
const { v4: uuidv4 } = require('uuid');

const CreateForm = () => {
  const router = useRouter();
  const [img, setImg] = useState<File | null>(null);
  const randomId = uuidv4();

  const categoryList = [
    {
      name: "Bilgisayar",
      icon: FaComputer,
    },
    {
      name: "Ayakkabı",
      icon: GiBallerinaShoes,
    },
    {
      name: "Tablet",
      icon: FaTabletAlt,
    },
    {
      name: "Mikfrofon",
      icon: CiMicrophoneOn,
    },
    {
      name: "Ayakkabı1",
      icon: GiBallerinaShoes,
    },
    {
      name: "Ayakkabı2",
      icon: GiBallerinaShoes,
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      image: "",
      inStock: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    let uploadedImg;

    const handleChange = async () => {
      toast.success("Yükleme işlemi başarılı.");

      try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${randomId}.jpg`);

        const uploadTask = uploadBytesResumable(storageRef, img);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                uploadedImg = downloadURL
                resolve()
              });
            }
          );
        });
      } catch (error) {
        console.log(error);
        toast.error("bir hata mevcut!");
      }
    };
    await handleChange();

    let newData = { ...data, image: uploadedImg };
    
    

    axios.post("/api/product", newData)
      .then(() => {
        toast.success("Ürün başarıyla eklendi.");
        router.refresh();
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  }

  return (
    <div>
      <Heading text="ÜRÜN OLUŞTUR" center />
      <div className="mx-10">
        <Input
          placeholder="Ad"
          type="text"
          id="name"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Açıklama"
          type="text"
          id="description"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Marka"
          type="text"
          id="brand"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Kategori"
          type="text"
          id="category"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Fiyat"
          type="text"
          id="price"
          register={register}
          errors={errors}
          required
        />
        <Checkbox
          id="inStock"
          label="Ürün Stokta Mevcut Mu?"
          register={register}
        />
        <div className="flex gap-3 mb-2">
          {categoryList.map((cat, i) => (
            <ChoiceInput
              key={i}
              icon={cat.icon}
              text={cat.name}
              selected={category == cat.name}
              onClick={(category) => setCustomValue("category", category)}
            />
          ))}
        </div>
        <input className="mb-2" type="file" onChange={onChangeFunc} />
        <Button
          text="Ürün Oluştur"
          onClick={handleSubmit(onSubmit)}
          icon={IoMdAdd}
          small
        />
      </div>
    </div>
  );
};

export default CreateForm;
