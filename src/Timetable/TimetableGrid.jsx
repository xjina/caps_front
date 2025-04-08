import React, { useState } from "react";
import LectureModal from "./LectureModal";

const TimetableGrid = ({
  scheduleData = [],
  setScheduleData,
  onDeleteLecture,
  isReadOnly = false
}) => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (lecture) => {
    setSelectedLecture(lecture);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLecture(null);
  };

  const handleDeleteLecture = (lectureId) => {
    const updatedData = scheduleData.filter(
      (lecture) => lecture.title !== lectureId
    );
    setScheduleData(updatedData);
    onDeleteLecture(lectureId);
    closeModal();
  };

  // ✅ 교수 변경 핸들러
  const handleProfessorChange = (classId, newProfessor) => {
    const updatedData = scheduleData.map((lecture) =>
      lecture.title === classId
        ? { ...lecture, instructor: newProfessor }
        : lecture
    );
    setScheduleData(updatedData);
  };

  const hours = Array.from({ length: 11 }, (_, i) => 9 + i);
  const days = ["월", "화", "수", "목", "금"];

  const CELL_WIDTH = 65;
  const CELL_HEIGHT = 40;
  const TIME_COLUMN_WIDTH = 35;
  const HEADER_HEIGHT = 25;
  const MINUTES_PER_CELL = 60;

  const timeToPixels = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const totalMinutes = (hours - 9) * 60 + minutes;
    return (totalMinutes * CELL_HEIGHT) / MINUTES_PER_CELL;
  };

  const dayToPixels = (day) => {
    const dayIndex = days.indexOf(day);
    return TIME_COLUMN_WIDTH + dayIndex * CELL_WIDTH + 4;
  };

  return (
    <>
      <div className="timetable">
        <div className="timetable-time"></div>
        {days.map((day, index) => (
          <div key={index} className="timetable-day">
            {day}
          </div>
        ))}

        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="timetable-time">{`${hour}:00`}</div>
            {days.map((_, dayIndex) => (
              <div key={dayIndex} className="timetable-cell"></div>
            ))}
          </React.Fragment>
        ))}

        {scheduleData.map((classInfo) => {
          const top = timeToPixels(classInfo.startTime);
          const height = timeToPixels(classInfo.endTime) - top;
          const left = dayToPixels(classInfo.day);

          return (
            <div
              key={classInfo.id}
              className="lecture-block"
              style={{
                top: `${top + HEADER_HEIGHT}px`,
                left: `${left}px`,
                height: `${height - 1}px`,
                width: `${CELL_WIDTH - 3}px`,
              }}
              onClick={() => {
                if (!isReadOnly) openModal(classInfo);
              }}
            >
              <div className="lecture-title">{classInfo.title}</div>
              <div className="lecture-instructor">{classInfo.instructor}</div>
            </div>
          );
        })}
      </div>

      {/* 모달 */}
      {!isReadOnly && (
        <LectureModal
          isOpen={isModalOpen}
          lecture={selectedLecture}
          onClose={closeModal}
          onDelete={handleDeleteLecture}
          onProfessorChange={handleProfessorChange} // ✅ 전달
        />
      )}
    </>
  );
};

export default TimetableGrid;