#include <iostream>
#include <fstream>
#include <string>
#include <vector>

std::vector<std::string> readIntoArray( char* file ) {
  std::vector<std::string> array;
  std::ifstream ifile( file );

  if ( !ifile ) {
    std::cerr << "Could not open '" << file << "'!\n";

    return array;
  }

  std::string nextLine;

  while ( ifile ) {
    if ( !ifile ) {
      break;
    }

    getline( ifile, nextLine );

    array.push_back( nextLine );
  }

  if ( ifile.is_open() ) {
    ifile.close();
  }
  

  return array;
}
