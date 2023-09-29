import { Skeleton, Box } from "@mui/material";

export const ProductsSkeleton = () => {
  return (
    <Box
      sx={{
        width: 300,
        marginRight: 0.5,
        m: 3,
      }}
    >
      <Skeleton variant="rectangular" animation="wave" height={400} />
      <br />
      <Box>
        <Skeleton variant="text" height={20} />
        <br />
        <Skeleton variant="text" height={20} width="40%" />
      </Box>
    </Box>
  );
};
