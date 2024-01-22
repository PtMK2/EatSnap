import { styled } from '@mui/system';
import { Paper } from '@mui/material';

export const StyledPaper = styled(Paper)({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100px',
});

export const StyledMapContainer = styled('div')({
  height: '85vh',
  width: '100%',
});

export const StyledMarkerContainer = styled('div')({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  '&:hover': { zIndex: 2 },
});

export const StyledPointer = styled('div')({
  cursor: 'pointer',
});
