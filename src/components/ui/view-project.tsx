import { format } from 'date-fns';
import { X } from 'lucide-react'; 

type User = {
  username: string;
  name?: string | null;
};

type ProjectData = {
  title: string;
  description: string;
  imageSrc: string;
  username?: string;
  user?: User | null;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  finalReportUrl?: string;
};

type ViewProjectProps = {
  project: ProjectData | null;
  onClose?: () => void;
};

export default function ViewProject({ project, onClose }: ViewProjectProps) {
  if (!project) return (
    <div className="flex items-center justify-center h-64 rounded-lg bg-gray-50">
      <p className="text-gray-400">No project to display</p>
    </div>
  );

  return (
    <div className="relative bg-white rounded-lg max-h-[90vh] overflow-y-auto p-5 border">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 shadow-sm hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      )}

      <div className="relative h-48 md:h-56 w-full overflow-hidden rounded-xl">
        <img 
          src={project.imageSrc} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <span className="text-sm text-gray-300 uppercase">{project.status || "No status"}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          {project.createdAt && (
            <span className="flex items-center">
              <span className="font-medium text-gray-400 mr-1">Created:</span>
              {format(new Date(project.createdAt), 'MMM d, yyyy')}
            </span>
          )}
        </div>

        <div className="prose prose-sm max-w-none text-gray-600">
          {project.description.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div>
              <p className="font-medium text-gray-800">
                by {project.user?.name || project.username || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500">Author</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p><strong>Final Report URL:</strong> <a href={project.finalReportUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">Click There</a></p>
        </div>
      </div>
    </div>
  );
}
