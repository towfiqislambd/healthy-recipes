import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from '../ui/dialog';

const AddMealModal = ({ setOpen, galleySettings, setGallerySettings }) => {
  return (
    <DialogContent className={'max-w-lg font-inter'}>
      <DialogHeader>
        <DialogTitle> </DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="w-full">
          {/* title */}
          <h5 className="text-primary font-newBaskerville leading-[132%] text-[28px]">
            Gallery Settings
          </h5>

          {/* toggle buttons */}
          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <span className="text-primary leading-[200%] font-medium">
                Guests can download photos
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary leading-[200%] font-medium">
                Add a cover photo
              </span>
            </div>
          </div>

          {/* buttons */}
          <div className="py-6 flex items-center justify-end gap-5">
            <button
              onClick={() => setOpen(false)}
              className="px-8 py-2.5 border border-primary bg-primary text-white rounded-md"
            >
              Cancel
            </button>
            <button className="px-8 py-2.5 border border-primary text-primary rounded-md">
              Save
            </button>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddMealModal;
