
// import { useEffect, useState } from 'react';
// import SearchAndFilter from '@/components/shared/SearchAndFilter';
// import InterviewCard from '@/components/shared/InterviewShow';

// const Interviews = () => {
//   const [interviews, setInterviews] = useState([]);
//   const [filteredInterviews, setFilteredInterviews] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
//       credentials: 'include',
//     })
//       .then(res => res.json())
//       .then(data => {
//         setInterviews(data);
//         setFilteredInterviews(data);
//       })
//       .catch(err => {
//         console.error('Failed to fetch interviews:', err);
//       });
//   }, []);

//   // Combined filter and search function
//   const filterAndSearch = (filters, query) => {
//     let results = [...interviews];

//     if (filters.company) {
//       results = results.filter(i => {
//         if (i?.company?.id && i.company.id.toString() === filters.company.toString()) return true;
//         if (i?.company?.name && i.company.name.toLowerCase() === filters.company.toLowerCase()) return true;
//         if (typeof i?.company === 'string' && i.company.toLowerCase() === filters.company.toLowerCase()) return true;
//         return false;
//       });
//     }

//     if (filters.role) {
//       results = results.filter(i => {
//         if (i?.role?.id === filters.role) return true;
//         if (i?.role?.name?.toLowerCase() === filters.role.toLowerCase()) return true;
//         return false;
//       });
//     }

//     if (filters.difficulty) {
//       results = results.filter(i => i?.difficultyLevel === filters.difficulty);
//     }

//     if (filters.tags && filters.tags.length > 0) {
//       results = results.filter(i =>
//         i?.tags && i.tags.some(tag => filters.tags.includes(tag.id))
//       );
//     }

//     if (query) {
//       const lowerQuery = query.toLowerCase();
//       results = results.filter(i =>
//         i?.title?.toLowerCase().includes(lowerQuery) ||
//         i?.content?.toLowerCase().includes(lowerQuery) ||
//         i?.companyId?.toLowerCase().includes(lowerQuery) ||
//         i?.role?.name?.toLowerCase().includes(lowerQuery)
//       );
//     }

//     setFilteredInterviews(results);
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     filterAndSearch(newFilters, searchQuery);
//   };

//   const handleSearchChange = (query) => {
//     setSearchQuery(query);
//     filterAndSearch(filters, query);
//   };

  

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Interview Experiences</h1>
//         <p className="text-muted-foreground">
//           Learn from others' interview journeys at top companies
//         </p>
//       </div>

//       <SearchAndFilter
//         type="interviews"
//         onFilterChange={handleFilterChange}
//         onSearchChange={handleSearchChange}
//       />

//       {filteredInterviews.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredInterviews.map(interview => (
//             <InterviewCard
//               key={interview._id}
//               interview={interview}
//               onDelete={() => handleDelete(interview._id)}
//               onEdit={() => handleEdit(interview._id)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-16">
//           <h3 className="text-xl font-medium mb-2">No interviews found</h3>
//           <p className="text-muted-foreground">
//             Try adjusting your search or filters
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Interviews;

import { useEffect, useState } from 'react';
import SearchAndFilter from '@/components/shared/SearchAndFilter';
import InterviewCard from '@/components/shared/InterviewShow';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setInterviews(data);
        setFilteredInterviews(data);
      })
      .catch(err => {
        console.error('Failed to fetch interviews:', err);
      });
  }, []);

  // Combined filter and search function
  const filterAndSearch = (filters, query) => {
    let results = [...interviews];

    // Company filter
    if (filters.company) {
      results = results.filter(interview => {
        // Match against companyId (which is what InterviewShow component uses)
        return interview.companyId === filters.company;
      });
    }

    // Role filter
    if (filters.role) {
      results = results.filter(interview => {
        // Match against roleId (which is what InterviewShow component uses)
        return interview.roleId === filters.role;
      });
    }

    // Difficulty filter
    if (filters.difficulty) {
      results = results.filter(interview => 
        interview.difficultyLevel === filters.difficulty
      );
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(interview => {
        // Check if interview has tags and if any match the filter tags
        return interview.tags && interview.tags.some(tag => 
          // Handle both tag objects with id property and tag strings
          (typeof tag === 'object' && tag.id) 
            ? filters.tags.includes(tag.id)
            : filters.tags.includes(tag)
        );
      });
    }

    // Search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(interview =>
        (interview.title && interview.title.toLowerCase().includes(lowerQuery)) ||
        (interview.content && interview.content.toLowerCase().includes(lowerQuery)) ||
        (interview.companyId && interview.companyId.toLowerCase().includes(lowerQuery)) ||
        (interview.roleId && interview.roleId.toLowerCase().includes(lowerQuery))
      );
    }

    setFilteredInterviews(results);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    filterAndSearch(newFilters, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterAndSearch(filters, query);
  };

  // Note: handleDelete and handleEdit are not defined in your original code
  // Adding stub functions to avoid errors
  const handleDelete = (id) => {
    console.log(`Delete interview with id ${id}`);
    // Implement delete functionality here
  };

  const handleEdit = (id) => {
    console.log(`Edit interview with id ${id}`);
    // Implement edit functionality here
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Experiences</h1>
        <p className="text-muted-foreground">
          Learn from others' interview journeys at top companies
        </p>
      </div>

      <SearchAndFilter
        type="interviews"
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {filteredInterviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterviews.map(interview => (
            <InterviewCard
              key={interview._id}
              interview={interview}
              onDelete={() => handleDelete(interview._id)}
              onEdit={() => handleEdit(interview._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No interviews found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Interviews;