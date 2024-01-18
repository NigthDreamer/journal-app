import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Labore dolor ea duis et quis ipsum minim esse. Id dolore officia in proident enim
        magna esse sint Lorem veniam enim ut. Ea eu esse irure ut in ipsum laborum ut sit
        ut laboris adipisicing exercitation quis. In ut qui consequat incididunt pariatur
        laborum. Pariatur esse culpa nisi magna cupidatat.
      </Typography> */}

      <NothingSelectedView />

      {/* <NoteView/> */}

      <IconButton
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.75 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
    </JournalLayout>
  );
};
