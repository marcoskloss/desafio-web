import * as React from "react";
import styled from "styled-components";

import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";

export const ImageSelector = ({ ...props }) => {
  return <div {...props}>img</div>;
};

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

    &:hover {
      outline: "1px dashed white";
    }
  }
`;

const ImageOverlay = ({ onClearImage, onNewImage }) => {
  return (
    <SImageOverlay>
      <p onClick={onNewImage}>Selecione uma imagem</p>
      <p onClick={onClearImage}>Remover imagem</p>
    </SImageOverlay>
  );
};

const Image = ({ url, onOpenImage, onClearImage }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  if (url) {
    return (
      <div
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        style={{
          maxWidth: "200px",
          maxHeight: "250px",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        {showOverlay && (
          <ImageOverlay onNewImage={onOpenImage} onClearImage={onClearImage} />
        )}
        <img alt="User" src={url} />
      </div>
    );
  }

  return (
    <div
      onClick={() => onOpenImage()}
      style={{
        marginBottom: "30px",
        border: "1px solid white",
        padding: "8px",
        width: "150px",
        cursor: "pointer",
      }}
    >
      Selecione uma imagem
    </div>
  );
};

export const ImageSelectorTODO = ({ url, onRemoveImage, onNewImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClearImage = useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";
    // TODO
    // onRemoveImage
  }, []);

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

            // TODO
            // onNewImage
            // upload do File usando o formData
          } catch (err) {
            toast.error("Algum erro aconteceu, tente novamente.");
            if (inputRef.current) inputRef.current.value = "";
            console.error(err);
          }
        }}
      />
      <Image url={url} onOpenImage={onOpenImage} onClearImage={onClearImage} />
    </>
  );
};
