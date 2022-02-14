import * as React from "react";
import styled from "styled-components";

import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { fileToBase64 } from "../../util/fileToBase64";

const SImageOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000aa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  p {
    padding: 4px;
    cursor: pointer;
    color: white;

    &:hover {
      outline: 1px dashed white;
    }
  }
`;

const SImageSelector = styled.div`
  border: 1px dashed ${(props) => props.theme.colors.borderColor};
  padding: 8px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.darkenBorderColor};
  }
`;

type ImageOverlayProps = {
  onClearImage: () => Promise<void>;
  onNewImage: () => void;
};
const ImageOverlay: React.FC<ImageOverlayProps> = ({
  onClearImage,
  onNewImage,
}) => {
  return (
    <SImageOverlay>
      <p onClick={onNewImage}>Selecione uma imagem</p>
      <p onClick={onClearImage}>Remover imagem</p>
    </SImageOverlay>
  );
};

type ImageProps = {
  url?: string;
  onClearImage: () => Promise<void>;
  onOpenImage: () => void;
};
const Image: React.FC<ImageProps> = ({ url, onOpenImage, onClearImage }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  if (url) {
    return (
      <div
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        style={{
          maxWidth: "250px",
          maxHeight: "300px",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        {showOverlay && (
          <ImageOverlay onNewImage={onOpenImage} onClearImage={onClearImage} />
        )}
        <img alt="User" src={url} style={{ width: "250px", height: "300px" }} />
      </div>
    );
  }

  return (
    <SImageSelector onClick={() => onOpenImage()}>
      Selecione uma imagem
    </SImageSelector>
  );
};

type ImageSelectorProps = {
  url?: string;
  onRemoveImage: () => Promise<void>;
  onNewImage: (file: File) => Promise<void>;
};

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  url,
  onRemoveImage,
  onNewImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(url);

  const onClearImage = useCallback(async () => {
    if (inputRef.current) inputRef.current.value = "";
    setImageUrl(undefined);

    onRemoveImage();
  }, [onRemoveImage]);

  const onOpenImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={async (ev) => {
          try {
            const file = ev.target.files?.[0];

            if (!file) return;

            const fileSizeKb = file.size / 1024;
            if (fileSizeKb > 50) {
              toast.error("A imagem deve ter tamanho máximo de 50 Kb!");

              if (inputRef.current) inputRef.current.value = "";
              return;
            }

            const base64Image = await fileToBase64(file);
            setImageUrl(base64Image);

            onNewImage(file);
          } catch (err) {
            toast.error("Algum erro aconteceu, tente novamente.");
            if (inputRef.current) inputRef.current.value = "";
            console.error(err);
          }
        }}
      />
      <Image
        url={imageUrl}
        onOpenImage={onOpenImage}
        onClearImage={onClearImage}
      />
    </>
  );
};
