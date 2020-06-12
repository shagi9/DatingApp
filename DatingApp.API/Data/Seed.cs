using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>> (userData);
            foreach (var user in users)
            {
                byte[] passwordHash, passwrodSalt;
                CreatePasswordHash("password", out passwordHash, out passwrodSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwrodSalt;
                user.Username = user.Username.ToLower();

                _context.Users.Add(user);
            }

            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            // everything is going to be disposed of when we finished it
            using (var hmac = new HMACSHA512())
            {
                // randomly generated key
                passwordSalt = hmac.Key;
                // Get your password as a byte array
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
