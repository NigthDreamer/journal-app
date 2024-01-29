import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store';
import { useMemo } from 'react';

export const JournalPage = () => {
  const { isSaving, active } = useSelector((state) => state.journal);

  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);
  const isActiveNote = useMemo(() => active !== null, [active]);

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>

      {
        (isActiveNote) ? <NoteView /> : <NothingSelectedView />
      }

      <IconButton
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.75 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
        disabled={isSavingNote}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
