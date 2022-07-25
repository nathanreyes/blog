import { useDisplayMode } from '@/use/displayMode';

const dmState = useDisplayMode('light');

export function initAppState() {
  const state = JSON.parse(localStorage.getItem('state') || '{}');
  if (state.hasOwnProperty('displayMode')) dmState.displayMode.value = state.displayMode;

  watchEffect(() => {
    const saveState = {
      displayMode: dmState.displayMode.value,
    };
    console.log('save', saveState);
    localStorage.setItem('state', JSON.stringify(saveState));
  });
}

export function useAppState() {
  return {
    ...dmState,
  };
}
