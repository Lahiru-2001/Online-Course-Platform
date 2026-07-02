// Generate simulated 3000+ users
const roles = ['student', 'instructor', 'admin'];
const names = [
  'Alex Carter', 'Saman Perera', 'Ayubowan Admin', 'Ruwan Silva', 'Jane Doe', 'John Smith',
  'Priyantha Fernando', 'Emily Watson', 'Liam Neeson', 'Sarah Connor', 'Michael Jordan',
  'Kasun Jayawardena', 'Dilani Mendis', 'Pathum Nissanka', 'Kusal Mendis', 'Wanindu Hasaranga'
];

const generateUsers = () => {
  const users = [
    { id: 'u1', name: 'Alex Carter', role: 'student', email: 'alex@test.com', status: 'active', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    { id: 'u2', name: 'Saman Perera', role: 'instructor', email: 'saman@uni.lk', status: 'active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', specialization: 'React & Python masterclass' },
    { id: 'u3', name: 'Ayubowan', role: 'admin', email: 'admin@lms.com', status: 'active', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150' }
  ];

  for (let i = 4; i <= 3050; i++) {
    const randomName = names[i % names.length];
    const role = i === 4 ? 'instructor' : roles[i % roles.length];
    users.push({
      id: `u${i}`,
      name: `${randomName} ${i}`,
      role,
      email: `${randomName.toLowerCase().replace(/\s/g, '')}${i}@lms.com`,
      status: i % 25 === 0 ? 'inactive' : 'active',
      avatar: `https://i.pravatar.cc/150?img=${i % 70}`
    });
  }
  return users;
};

// Generate simulated courses
const courseTemplates = [
  { title: 'Advanced React Architecture', category: 'Web Development', price: 'LKR 3,500.00', duration: '12 weeks', level: 'Advanced' },
  { title: 'Python for Automation & scripting', category: 'Programming', price: 'LKR 2,500.00', duration: '8 weeks', level: 'Intermediate' },
  { title: 'UI/UX Dynamics & Micro-Animations', category: 'Design', price: 'LKR 4,000.00', duration: '6 weeks', level: 'Beginner' },
  { title: 'Mechatronics Fundamentals & Robotics', category: 'Engineering', price: 'LKR 5,500.00', duration: '10 weeks', level: 'Advanced' }
];

const generateCourses = () => {
  const courses = [];
  for (let i = 1; i <= 100; i++) {
    const template = courseTemplates[i % courseTemplates.length];
    courses.push({
      id: `c${i}`,
      title: `${template.title} (Vol ${Math.floor(i / 4 + 1)})`,
      category: template.category,
      price: template.price,
      duration: template.duration,
      level: template.level,
      instructor: `Instructor Saman (u2)`,
      enrolledCount: 15 + (i * 7) % 250,
      image: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500`
    });
  }
  return courses;
};

export const MOCK_USERS = generateUsers();
export const MOCK_COURSES = generateCourses();

export const MOCK_INVOICES = [
  { id: 'INV-2026-001', course: 'Advanced React Architecture', amount: 'LKR 3,500.00', dueDate: 'July 15, 2026', status: 'Outstanding' },
  { id: 'INV-2026-002', course: 'Python for Automation & scripting', amount: 'LKR 2,500.00', dueDate: 'July 20, 2026', status: 'Outstanding' },
  { id: 'INV-2026-003', course: 'UI/UX Dynamics & Micro-Animations', amount: 'LKR 4,000.00', dueDate: 'July 28, 2026', status: 'Paid' }
];

export const MOCK_CERTIFICATES = [
  { id: 'CERT-88712', title: 'React Master Architect', issueDate: 'June 01, 2026', grade: 'A+' },
  { id: 'CERT-12290', title: 'Python Fundamentals', issueDate: 'May 12, 2026', grade: 'A' }
];
