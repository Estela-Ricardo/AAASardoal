// src/pages/Home.tsx
import { Box, Typography, Fade } from "@mui/material";
import { useEffect, useState } from "react";

export const Home = () => {
  const [showSecondGif, setShowSecondGif] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSecondGif(true);
    }, 3000); // 3 segundos

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      height="100%"
     
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      p={3}
    >
      <Typography variant="h2" gutterBottom>
        Bem-vinda à Plataforma da Associação Amigos dos Animais de Sardoal
      </Typography>

      <Box gap={5} mt={12}  justifyContent="center">
        <img
          src="/foot-1256.gif"
          alt="GIF 1"
          style={{
            width: "100%",
            maxWidth: 300,
            borderRadius: 12,
            transform: "rotate(15deg)",
          }}
        />

        <Fade in={showSecondGif} timeout={700}>
          <img
            src="/output-onlinegiftools.gif"
            alt="GIF 2"
            style={{
              width: "100%",
              maxWidth: 300,
              borderRadius: 12,
              transform: "rotate(3deg)",
            }}
          />
        </Fade>
      </Box>
    </Box>
  );
};
