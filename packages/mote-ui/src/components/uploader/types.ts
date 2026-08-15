export type MtUploaderFileStatus = 'pending' | 'uploading' | 'done' | 'failed'

/** A file entry managed by the uploader. */
export interface MtUploaderFile {
  /** Original File object */
  file?: File
  /** Preview content, either a data URL or a remote URL */
  url?: string
  /** File name, shown for non-image files */
  name?: string
  status?: MtUploaderFileStatus
  /** Overlay message, e.g. the failure reason */
  message?: string
}

export interface MtUploaderProps {
  /** Bound file list */
  modelValue?: MtUploaderFile[]
  /** Accept attribute of the underlying file input */
  accept?: string
  /** Allow selecting multiple files */
  multiple?: boolean
  /** Maximum number of files */
  maxCount?: number
  /** Maximum size of a single file, in bytes */
  maxSize?: number
  disabled?: boolean
  /** Hide the delete buttons */
  readonly?: boolean
  /**
   * Called before a file is read. Return `false` to cancel, or return a
   * File / File[] to replace the selection.
   */
  beforeRead?: (file: File | File[]) => boolean | File | File[] | Promise<boolean | File | File[]>
  /**
   * Called after files are read into the list. Use it for custom upload
   * logic; a rejected Promise marks the files as failed.
   */
  afterRead?: (files: MtUploaderFile | MtUploaderFile[]) => void | Promise<unknown>
  /** Capture source passed to the file input: `'user'` (front camera) or `'environment'` (back camera) */
  capture?: 'user' | 'environment'
}
