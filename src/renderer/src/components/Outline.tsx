import { selectedNoteAtom } from '@renderer/store';
import { useAtomValue } from 'jotai';
import { ComponentProps } from 'react';


function extractHeadingsFromFile(note_content: string): string[] {
  try {
    const noteContent: string = note_content;

    // extract headings from note content
    const headingRegex = /^(#+)\s+(.*)$/gm;
    const matches = noteContent.match(headingRegex);

    // remove the '#' from the headings
    if (matches) {
        return matches.map(match => {
            const level = match.split(' ')[0].length;
            const headingText = match.replace(/^(#+)\s+/, '');
            return `${' '.repeat(level - 1)}- ${headingText}\n`;
          });
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error reading file: ${(error as Error).message}`);
    return [];
  }
}

export const OutlineTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div className='p-2'>
        <span className="text-gray-400">Outline</span><br />
    </div>
  )
}


export const OutlinePreview = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  const headingText = extractHeadingsFromFile(selectedNote.content);
  console.info('heading');

  return (
    <div className='p-2'>
        <span className='whitespace-pre-wrap'>{headingText}</span>
    </div>
  )
}
