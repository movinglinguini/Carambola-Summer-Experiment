const playthroughKey = 'experiment_playthrough_no';

export function getPlaythroughNo(): number {
  if (!localStorage.getItem(playthroughKey)) {
    localStorage.setItem(playthroughKey, '1');
  }

  return parseInt(localStorage.getItem(playthroughKey) as string, 10);
}

export function incrementPlaythroughNo(): void {
  const pNo = getPlaythroughNo();
  localStorage.setItem(playthroughKey, `${(pNo % 3) + 1}`);
}
