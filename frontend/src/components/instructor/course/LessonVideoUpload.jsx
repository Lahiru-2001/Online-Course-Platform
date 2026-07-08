import React, { useMemo } from "react";
import {
  Upload,
  Video,
  Trash2,
  PlayCircle,
} from "lucide-react";

export default function LessonVideoUpload({
  lesson,
  updateLessonVideo,
}) {
  const videoUrl = useMemo(() => {
    if (!lesson.video) return null;

    return URL.createObjectURL(lesson.video);
  }, [lesson.video]);

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const handleVideo = (e) => {
    if (!e.target.files.length) return;

    updateLessonVideo(
      lesson.id,
      e.target.files[0]
    );
  };

  const removeVideo = () => {
    updateLessonVideo(lesson.id, null);
  };

  return (
    <div className="space-y-5">

      {!lesson.video ? (

        <label className="block border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">

          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideo}
          />

          <Upload
            size={48}
            className="mx-auto text-orange-500 mb-4"
          />

          <h4 className="text-lg font-semibold text-slate-800">
            Upload Lesson Video
          </h4>

          <p className="text-sm text-gray-500 mt-2">
            Drag & Drop or Click to browse
          </p>

          <p className="text-xs text-gray-400 mt-3">
            MP4, MOV, AVI, MKV (Maximum 2GB)
          </p>

        </label>

      ) : (

        <div className="border rounded-xl bg-white overflow-hidden">

          <video
            src={videoUrl}
            controls
            className="w-full aspect-video bg-black"
          />

          <div className="p-4">

            <div className="flex justify-between items-start">

              <div className="flex gap-3">

                <PlayCircle
                  size={26}
                  className="text-orange-500 mt-1"
                />

                <div>

                  <h4 className="font-semibold text-slate-800">
                    {lesson.video.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {formatSize(lesson.video.size)}
                  </p>

                </div>

              </div>

              <div className="flex gap-2">

                <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm">

                  Replace

                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideo}
                  />

                </label>

                <button
                  type="button"
                  onClick={removeVideo}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">

        <div className="flex gap-3">

          <Video
            size={20}
            className="text-blue-600 mt-0.5"
          />

          <div>

            <h5 className="font-semibold text-blue-700">
              Video Recommendations
            </h5>

            <ul className="text-sm text-blue-600 mt-2 space-y-1 list-disc list-inside">
              <li>Resolution: 1920 × 1080 (Full HD)</li>
              <li>Format: MP4 (H.264)</li>
              <li>Aspect Ratio: 16:9</li>
              <li>Clear audio with minimal background noise</li>
              <li>Keep lesson videos under 20 minutes when possible</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}