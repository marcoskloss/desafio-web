import * as React from "react";
import { useState } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

import {
  Button,
  UserModal,
  VStack,
  HStack,
  Input,
  useForm,
  ImageSelector,
} from "../../components";
import { useUserContext } from "../../context/userContext";
import { api, serverUrl } from "../../lib/api";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    .user-image {
      margin-bottom: 10px;
    }
  }

  form {
    width: 100%;
    padding-left: 15px;
  }
`;

const initialState = {
  name: "",
  code: "",
  birth_date: "",
};

const validate = (state: typeof initialState) => {
  return (
    !!state.birth_date && !!state.name && !!state.code && !!state.birth_date
  );
};

const formatDate = (date?: Date) =>
  date ? new Date(date || "").toISOString().split("T")[0] : "";

const DEFAULT_IMAGE = "default-image.jpg";

type UserDetailsProps = { onClose: () => void };
export const UserDetails: React.FC<UserDetailsProps> = ({ onClose }) => {
  const { currentEditingUser, loadUserList } = useUserContext();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState(
    currentEditingUser?.image_url || DEFAULT_IMAGE
  );

  const { getValue, setOnChangeValue, getData, isValid } = useForm(
    currentEditingUser
      ? {
          ...currentEditingUser,
          birth_date: formatDate(currentEditingUser?.birth_date),
        }
      : initialState,
    validate
  );

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!isValid) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    const data = getData();

    const userData = {
      ...data,
      code: Number(data.code),
      birth_date: new Date(data.birth_date),
      image_url: imagePath,
    };

    try {
      if (currentEditingUser) {
        await api.put(`/users/${currentEditingUser.id}`, { ...userData });
      } else {
        const { data: user } = await api.post("/users", { ...userData });

        if (imageFile) {
          const imageUrl = await uploadImage(imageFile, user.id);
          await api.put(`/users/${user.id}`, { image_url: imageUrl });

          setImagePath(imageUrl);
        }
      }

      toast.success("Registro salvo!");
      await loadUserList();

      onClose();
    } catch (err) {
      const error: any = err;
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (currentEditingUser) {
        await api.delete(`/users/${currentEditingUser.id}`);

        toast.success("Usuário deletado!");

        await loadUserList();
        onClose();
      }
    } catch (err) {
      const error: any = err;
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const uploadImage = useCallback(
    async (file: File, id: number): Promise<string> => {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await api.put(`/users/upload-image/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data.image_path;
    },
    []
  );

  const onNewImage = useCallback(
    async (file: File) => {
      if (!currentEditingUser) {
        setImageFile(file);
        return;
      }

      const imageUrl = await uploadImage(file, currentEditingUser.id);
      setImagePath(imageUrl);
    },
    [currentEditingUser, uploadImage]
  );

  const onRemoveImage = useCallback(async () => {
    if (!currentEditingUser) {
      setImageFile(null);
      return;
    }

    await api.delete(`/users/image/${currentEditingUser.id}`);
    setImagePath(DEFAULT_IMAGE);
  }, [currentEditingUser]);

  return (
    <UserModal
      title={currentEditingUser ? "Editar usuário" : "Novo usuário"}
      onClose={onClose}
    >
      <Container>
        <ImageSelector
          onNewImage={onNewImage}
          onRemoveImage={onRemoveImage}
          url={
            currentEditingUser
              ? `${serverUrl}/users/images/${currentEditingUser?.image_url}`
              : undefined
          }
        />
        <form>
          <VStack gap="25px">
            <Input
              label="Nome"
              name="name"
              value={getValue("name")}
              onChange={setOnChangeValue("name")}
            />

            <HStack gap="15px">
              <Input
                label="Código"
                name="code"
                type="number"
                value={getValue("code")}
                onChange={setOnChangeValue("code")}
              />
              <Input
                label="Data de Nascimento"
                name="birth_date"
                type="date"
                value={getValue("birth_date")}
                onChange={setOnChangeValue("birth_date")}
              />
            </HStack>

            <HStack gap="15px" justify="flex-end">
              <Button variant="gray" type="button" onClick={onClose}>
                Voltar
              </Button>

              {currentEditingUser && (
                <Button variant="red" type="button" onClick={handleDelete}>
                  Excluir
                </Button>
              )}
              <Button variant="green" type="submit" onClick={handleSubmit}>
                Salvar
              </Button>
            </HStack>
          </VStack>
        </form>
      </Container>
    </UserModal>
  );
};
